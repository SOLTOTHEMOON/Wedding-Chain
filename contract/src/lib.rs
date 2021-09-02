use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    log::sol_log_compute_units,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};
use std::io::ErrorKind::InvalidData;

/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Marriage {
    pub archive_id: String,
}
const DUMMY_TX_ID: &str = "0000000000000000000000000000000000000000000";

pub fn get_init_marriage() -> Marriage {
    Marriage {
        archive_id: String::from(DUMMY_TX_ID),
    }
}
pub fn get_init_marriages() -> Vec<Marriage> {
    let mut messages = Vec::new();
    for _ in 0..20 {
        messages.push(get_init_marriage());
    }
    return messages;
}

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    msg!("Hello World Rust program entrypoint");

    // Iterating accounts is safer then indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        msg!("Greeted account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    // sol_log_compute_units();

    let marriage_instruction_data = Marriage::try_from_slice(instruction_data).map_err(|err| {
        msg!(
            "Attempt to deserialize instruction data has failed. {:?}",
            err
        );
        ProgramError::InvalidInstructionData
    })?;
    msg!(
        "marriage_instruction_data message object {:?}",
        marriage_instruction_data
    );

    let mut existing_marriages = match <Vec<Marriage>>::try_from_slice(&account.data.borrow_mut()) {
        Ok(data) => data,
        Err(err) => {
            if err.kind() == InvalidData {
                msg!("InvalidData so initializing account data");
                get_init_marriages()
            } else {
                panic!("Unknown error decoding account data {:?}", err)
            }
        }
    };
    let index = existing_marriages
        .iter()
        .position(|p| p.archive_id == String::from(DUMMY_TX_ID))
        .unwrap(); // find first dummy data entry
    msg!("Found index {}", index);
    existing_marriages[index] = marriage_instruction_data; // set dummy data to new entry
    let updated_marriages = existing_marriages
        .try_to_vec()
        .expect("Failed to encode data."); // set messages object back to vector data
    msg!(
        "Final existing_data_messages[index] {:?}",
        existing_marriages[index]
    );

    // data algorithm for storing data into account and then archiving into Arweave
    // 1. Each ChatMessage object will be prepopulated for txt field having 43 characters (length of a arweave tx).
    // Each ChatMessageContainer will be prepopulated with 10 ChatMessage objects with dummy data.
    // 2. Client will submit an arweave tx for each message; get back the tx id; and submit it to our program.
    // 3. This tx id will be saved to the Solana program and be used for querying back to arweave to get actual data.
    let data = &mut &mut account.data.borrow_mut();
    msg!("Attempting save data.");
    data[..updated_marriages.len()].copy_from_slice(&updated_marriages);
    let saved_data = <Vec<Marriage>>::try_from_slice(data)?;
    msg!(
        "ChatMessage has been saved to account data. {:?}",
        saved_data[index]
    );
    sol_log_compute_units();

    msg!("End program.");

    Ok(())
}

// Sanity tests
#[cfg(test)]
mod test {
    use super::*;
    use solana_program::clock::Epoch;

    #[test]
    fn test_sanity() {
        let program_id = Pubkey::default();
        let key = Pubkey::default();
        let mut lamports = 0;
        let messages = get_init_marriages();
        let mut data = messages.try_to_vec().unwrap();
        let owner = Pubkey::default();
        let account = AccountInfo::new(
            &key,
            false,
            true,
            &mut lamports,
            &mut data,
            &owner,
            false,
            Epoch::default(),
        );
        let archive_id = "abcdefghijabcdefghijabcdefghijabcdefghijabc";
        let marriage_instruction_data = Marriage {
            archive_id: String::from(archive_id),
        };
        let instruction_data = marriage_instruction_data.try_to_vec().unwrap();

        let accounts = vec![account];

        process_instruction(&program_id, &accounts, &instruction_data).unwrap();
        let marriages = &<Vec<Marriage>>::try_from_slice(&accounts[0].data.borrow()).unwrap();
        let test_archive_id = &marriages[0].archive_id;
        println!("chat message {:?}", &marriages);
        // I added first data and expect it to contain the given data
        assert_eq!(String::from(archive_id).eq(test_archive_id), true);
    }
}
