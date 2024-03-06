import React from "react";
import "./password.css";
import { useState, useEffect } from "react";
import CompletionDialog from "./CompletionDialog";
const Password = () => {
    const symbol = '!";#$%&\'()*+,-./:;<=>?@[]^_`{|}~';
    const lettersLower = 'abcdefghijklmnopqrstuvwxyz';
    const lettersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    // const arr = ['abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz'];

    const [passwordLength, setPasswordLength] = useState(6);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true); 
    const [includeUppercase, setIncludeUppercase] = useState(true); 
    const [beginWithLetter, setBeginWithLetter] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [noSimilarChars, setNoSimilarChars] = useState(false);
    const [noDuplicateChars, setNoDuplicateChars] = useState(false);
    const [noSequentialChars, setNoSequentialChars] = useState(false);
    const [autoGenerate, setAutoGenerate] = useState(true);
    const [quantity, setQuantity] = useState(6); 
    const [generatedPasswords, setGeneratedPasswords] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleGeneratePassword = () => {

        // console.log(
        // "Password Length is", passwordLength,
        // "\nInclude Numbers:", includeNumbers ? "Yes" : "No",
        // "\nInclude Lowercase:", includeLowercase ? "Yes" : "No",
        // "\nInclude Uppercase:", includeUppercase ? "Yes" : "No",
        // "\nBegin With Letter:", beginWithLetter ? "Yes" : "No",
        // "\nInclude Symbols:", includeSymbols ? "Yes" : "No",
        // "\nNo Similar Characters:", noSimilarChars ? "Yes" : "No",
        // "\nNo Duplicate Characters:", noDuplicateChars ? "Yes" : "No",
        // "\nNo Sequential Characters:", noSequentialChars ? "Yes" : "No",
        // "\nAutogenerate is:", autoGenerate ? "Yes" : "No",
        // "\nTotal Quantity: ", quantity
        // );

        let newPasswords = [];

        for (let i = 0; i < quantity; i++) {
            let newPassword = '';
            
            // Conditionally add characters based on options
            if (includeLowercase) newPassword += lettersLower;
            if (includeUppercase) newPassword += lettersUpper;
            if (includeNumbers) newPassword += numbers;
            if (includeSymbols) newPassword += symbol;
            
            // Check other conditions
            if (noSimilarChars) newPassword = removeSimilarChars(newPassword);
            if (noDuplicateChars) newPassword = removeDuplicateChars(newPassword);
            if (noSequentialChars) newPassword = removeSequentialChars(newPassword);

            // Shuffle the characters
            newPassword = shuffle(newPassword);

            // If beginning with a letter, remove numbers and symbols from the beginning
            if (beginWithLetter) {
                newPassword = newPassword.replace(/^[^a-zA-Z]+/, '');
            }

            // Truncate the password to the desired length
            newPassword = newPassword.slice(0, passwordLength);

            // Add generated password to the list
            newPasswords.push(newPassword);
        }

        // Update the state with the generated passwords
        setGeneratedPasswords(newPasswords);

        // console.log("Generated Passwords are: ", generatedPasswords, "Length of arr is: ", generatedPasswords.length);
        console.log("Generated Passwords are: ", newPasswords, "Length of arr is: ", newPasswords.length);
                
    };

    // Function to remove similar characters
    const removeSimilarChars = (password) => {
        return password.replace(/[il1Lo0O]/g, '');
    };

    // Function to remove duplicate characters
    const removeDuplicateChars = (password) => {
        return password
            .split('')
            .filter((char, index, self) => self.indexOf(char) === index)
            .join('');
    };

    // Function to remove sequential characters
    const removeSequentialChars = (password) => {
        return password.replace(/(.)\1+/g, '$1');
    };

    // Function to shuffle the characters
    const shuffle = (password) => {
        return password.split('').sort(() => Math.random() - 0.5).join('');
    };

    const handleCopyAllPasswords = () => {
        const allPasswords = generatedPasswords.join('\n');
    
        // Copy all passwords to the clipboard
        navigator.clipboard.writeText(allPasswords)
            .then(() => {
                // Success message
                console.log('Passwords copied to clipboard.');
                setDialogOpen(true);
            })
            .catch((error) => {
                // Error handling
                console.error('Failed to copy passwords: ', error);
            });
    }

    const handleClose = () => {
        setDialogOpen(false);
    }

    useEffect(() => {
        if (autoGenerate) {
            handleGeneratePassword();
        }
    }, [autoGenerate]);

    return (
        <div>
            <div className="container">
                <CompletionDialog open={dialogOpen} handleClose={handleClose} />
                {/* <p>Password Generator</p> */}
                <div className="container-2">
                    <div className="container-3">
                        <p id="header-id">Password Generator Plus</p>
                    </div>
                    <div className="container-4">
                        <div className="table-1">
                            <table className="first-table">
                                <tr>
                                    <td id="col-1">Password Length:</td>
                                    <td id="col-2">
                                        <select id="passLength" value={passwordLength} onChange={(event) => setPasswordLength(parseInt(event.target.value))}>
                                            <optgroup label="Weak">
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                            </optgroup>
                                            <optgroup label="Strong">
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>		
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                            </optgroup>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="col-1">Include Numbers</td>
                                    <td id="col-2">
                                        <label>
                                            <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)}></input>
                                            ( e.g. 123456 )
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="col-1">Include Lowercase Characters</td>
                                    <td id="col-2">
                                        <label>
                                            <input type="checkbox" checked={includeLowercase} onChange={() => {setIncludeLowercase(!includeLowercase)}}></input>
                                            ( e.g. abcdefgh )
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="col-1">Include Uppercase Characters:</td>
                                    <td id="col-2">
                                        <label>
                                            <input type="checkbox" checked={includeUppercase} onChange={() => {setIncludeUppercase(!includeUppercase)}}></input>
                                            ( e.g. ABCDEFGH )
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="col-1">Begin With A Letter:</td>
                                    <td id="col-2">
                                        <label>
                                            <input type="checkbox" checked={beginWithLetter} onChange={() => setBeginWithLetter(!beginWithLetter)}></input>
                                            ( don't begin with a number or symbol )
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="col-1">Include Symbols:</td>
                                    <td id="col-2">
                                        <label>
                                            <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)}></input>
                                            ( {symbol} )
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="col-1">No Similar Characters:</td>
                                    <td id="col-2">
                                        <label>
                                            <input type="checkbox" checked={noSimilarChars} onChange={() => setNoSimilarChars(!noSimilarChars)}></input>
                                            ( don't use characters like i, l, 1, L, o, 0, O, etc. )
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="col-1">No Duplicate Characters:</td>
                                    <td id="col-2">
                                        <label>
                                            <input type="checkbox" checked={noDuplicateChars} onChange={() => setNoDuplicateChars(!noDuplicateChars)}></input>
                                            ( don't use the same character more than once )
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="col-1">No Sequential Characters:</td>
                                    <td id="col-2">
                                        <label>
                                            <input type="checkbox" checked={noSequentialChars} onChange={() => setNoSequentialChars(!noSequentialChars)}></input>
                                            ( don't use sequential characters, e.g. abc, 789 )
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="col-1">Auto Generate On The First Call:</td>
                                    <td id="col-2">
                                        <label>
                                            <input type="checkbox" checked={autoGenerate} onChange={() => setAutoGenerate(!autoGenerate)}></input>
                                            ( generate passwords automatically when you open this page )
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="col-1">Quantity:</td>
                                    <td id="col-2">
                                        <select id="passQuantity" value={quantity} onChange={(event) => setQuantity(event.target.value)}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>		
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                            <option value="32">32</option>
                                            <option value="33">33</option>
                                            <option value="34">34</option>
                                            <option value="35">35</option>
                                            <option value="36">36</option>
                                            <option value="37">37</option>
                                            <option value="38">38</option>
                                            <option value="39">39</option>
                                            <option value="40">40</option>
                                            <option value="41">41</option>
                                            <option value="42">42</option>
                                            <option value="43">43</option>
                                            <option value="44">44</option>
                                            <option value="45">45</option>
                                            <option value="46">46</option>
                                            <option value="47">47</option>
                                            <option value="48">48</option>
                                            <option value="49">49</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                            <option value="300">300</option>
                                            <option value="500">500</option>
                                            <option value="1000">1000</option>	
                                        </select>
                                    </td>
                                </tr>
                                <tr id="last-id">
                                    <td></td>
                                    <td>
                                        <button onClick={handleGeneratePassword} className="btn1" id="generate1">GENERATE</button>
                                        <button onClick={handleCopyAllPasswords} className="btn1" id="copyall">COPY ALL</button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className="table-2">
                            <div className="password-title">
                                <p>Your New Passwords:</p>
                            </div>
                            <div className="password-list">
                                <table className="second-table">
                                    {generatedPasswords.map((password, index) => (
                                        <tr key={index}>
                                            <td className="pass-col" id="sno-id">{index+1}</td>
                                            <td className="pass-col" id="pass-id">{password}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Password;