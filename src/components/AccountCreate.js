import React, { useEffect, useRef, useState } from 'react'
import {faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const AccountCreate = () => {

    const userRef = useRef();
    // const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])


    useEffect(() => {
        if (success) {
          const timer = setTimeout(() => {
            setSuccess(false);
            setErrMsg('');
          }, 2000);
    
          return () => clearTimeout(timer); // Clear the timer on component unmount or when success changes
        }
      }, [success]);
    
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])


    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Simulate loading state
          setLoading(true);
      
          // Simulate a dummy request (you can replace this with an actual API call)
          await new Promise(resolve => setTimeout(resolve, 1000));
      
          // Simulate a successful response
          setSuccess(true);
          
          setErrMsg('Account created successfully');
        } catch (err) {
          // Simulate an error response

          setSuccess(false);
          setErrMsg('Failed to create account. Please try again.');
        } finally {
            // Reset loading state after the request is complete
            setLoading(false);
        
            // Clear form fields
            setUser('');
            setPwd('');
            setEmail('');
            setMatchPwd('');
            setUserFocus(false);
            setPwdFocus(false);
            setMatchFocus(false);
            setValidName(false);
            setValidPwd(false);
            setValidMatch(false);
        
            // Clear form fields only if submission was successful
            if (success) {
              setUser('');
              setPwd('');
              setEmail('');
              setMatchPwd('');
              setUserFocus(false);
              setPwdFocus(false);
              setMatchFocus(false);
              setValidName(false);
              setValidPwd(false);
              setValidMatch(false);
            }
          }
      };

  return (
    <div className='flex flex-col w-[85vw] items-center mt-[10%] ml-[15%]'>
      <h1 className='font-bold text-2xl mb-6'>Account Creation</h1>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <label>Username: </label>


        {/* Username Validation  */}
        <input 
            className='border-2 border-black rounded-md  px-2 mb-2 w-[300px]'
            type='text'
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            placeholder='Enter Username'
        />
        <p id="uidnote" className={userFocus && user && !validName ? 
                "text-xs rounded-md bg-black  text-white p-[0.25rem] relative bottom-[-10px] mb-6" : 
                "absolute left-[-9999px]"}
        >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.<br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.
        </p>





        <label>Email: </label>
        <input 
            className='border-2 border-black rounded-md mb-2 px-2'
            type='Email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password: </label>
        <input 
            className='border-2 border-black rounded-md mb-4 px-2'
            type='text'
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            placeholder='Enter Password'
        />

        <p id="pwdnote" className={pwdFocus && !validPwd ?
            "text-xs rounded-md bg-black  text-white p-[0.25rem] relative bottom-[-10px] mb-6" : 
            "absolute left-[-9999px] hidden"}
        >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.<br />
            Must include uppercase and lowercase letters,<br/> a number and a special character.<br />
            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
        </p>

        <label>Confirm Password: </label>
        <input
            className='border-2 border-black rounded-md mb-4 px-2'
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            placeholder='Confirm Password'
        />
        <p id="confirmnote" className={matchFocus && !validMatch ?
        "text-xs rounded-md bg-black  text-white p-[0.25rem] relative bottom-[-10px] mb-6" : 
        "absolute left-[-9999px] hidden"}
        >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
        </p>

        <button 
            disabled={!validName || !validPwd || !validMatch ? true : false}
            className='border-2 border-black p-2 rounded-md cursor-pointer bg-slate-400 text-lg font-bold'>
            
            {loading ? 'Submitting...' : 'Submit'}
        </button>
        {loading && <p>Loading...</p>}
        {errMsg && <p className="text-red-500">{errMsg}</p>}
        {success && <p className="text-green-500">Account created successfully</p>}
    
      </form>
    </div>
  )
}

export default AccountCreate
