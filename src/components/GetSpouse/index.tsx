import React from 'react'
import { ArweaveMarriage } from '../../arweave/arweave'
import { useHistory } from 'react-router-dom'
import "./style.css"
import { getHistory } from '../../utils/marriageUtils'
import { AccountContext } from '../../utils/accountContext'

interface GetSpouseProps {
    setSpouseAccountKey: React.Dispatch<React.SetStateAction<string>>;
    setspouseMarriageHistory: React.Dispatch<React.SetStateAction<ArweaveMarriage[]>>;
    setMarriageHistory: React.Dispatch<React.SetStateAction<ArweaveMarriage[]>>;

}



export default function GetSpouse(props: GetSpouseProps) {
    const history = useHistory()

    return (
        <AccountContext.Consumer>
            {({ account, spouseAccountKey }) => (

                <div className="card">
                    <div className="input-box">

                        <input
                            className="spouse-acc-input"
                            type="text"
                            placeholder="Spouse Account Key"
                            onChange={(e) => props.setSpouseAccountKey(e.target.value)}
                        />
                    </div>
                    <button onClick={async () => {
                        await getHistory(account!, spouseAccountKey, props.setspouseMarriageHistory, props.setMarriageHistory)
                        history.push("/dashboard")

                    }}>Next</button>
                </div>
            )}

        </AccountContext.Consumer>

    )
}
