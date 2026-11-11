import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from "react";
import {authApi,type User} from "./api";
type Auth={token:string|null;user:User|null;loading:boolean;setSession:(token:string,user?:User)=>void;signOut:()=>Promise<void>;refresh:()=>Promise<void>};
const Context=createContext<Auth|null>(null);const KEY="revercue_token";
export function AuthProvider({children}:{children:ReactNode}){
 const [token,setToken]=useState<string|null>(()=>localStorage.getItem(KEY));const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(Boolean(token));
 const refresh=async()=>{if(!token){setUser(null);setLoading(false);return;}try{setUser((await authApi.me(token)).user);}catch{localStorage.removeItem(KEY);setToken(null);setUser(null);}finally{setLoading(false);}};
 useEffect(()=>{void refresh();},[token]);
 const setSession=(value:string,nextUser?:User)=>{localStorage.setItem(KEY,value);setToken(value);if(nextUser)setUser(nextUser);};
 const signOut=async()=>{if(token)try{await authApi.logout(token);}catch{/* local logout remains available */}localStorage.removeItem(KEY);setToken(null);setUser(null);};
 const value=useMemo(()=>({token,user,loading,setSession,signOut,refresh}),[token,user,loading]);
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useAuth(){const value=useContext(Context);if(!value)throw new Error("useAuth must be used inside AuthProvider");return value;}