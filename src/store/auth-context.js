import { createContext ,useState} from "react";


export const AuthContext = createContext({
    token:'',
    isAuthnticated:false,
    authenticate:()=>{},
    logout:()=>{},
});

export const AuthContextProvider = ({children})=>{
    const [authToken,setAuthToken] = useState();

    const authenticate = (token)=>{
        setAuthToken(token);
    };

    const logout = ()=>{
        setAuthToken(null);
    };

    let value = {
        token:authToken,
        isAuthnticated:!!authToken,
        authenticate,
        logout,
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};
