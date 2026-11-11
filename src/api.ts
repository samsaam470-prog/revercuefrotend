const BASE = (import.meta.env.VITE_API_BASE_URL || "https://revercue-api.samsaam.workers.dev").replace(/\/$/, "");
export type ApiError = Error & { status?: number; code?: string; details?: unknown };
type Options = Omit<RequestInit,"body"> & { body?: unknown; token?: string | null };
export async function api<T>(path:string, options:Options={}):Promise<T>{
 const {body,token,headers,...rest}=options;
 const response=await fetch(BASE+path,{...rest,headers:{...(body instanceof FormData?{}:{"Content-Type":"application/json"}),...(token?{Authorization:`Bearer ${token}`}:{}),...headers},body:body===undefined?undefined:body instanceof FormData?body:JSON.stringify(body)});
 const type=response.headers.get("content-type")||"";
 if(!response.ok){const payload=type.includes("application/json")?await response.json().catch(()=>({})):{};const err=new Error(payload.message||`Request failed (${response.status})`) as ApiError;err.status=response.status;err.code=payload.error;err.details=payload.details;throw err;}
 if(response.status===204)return undefined as T;
 return type.includes("application/json")?response.json() as Promise<T>:response as unknown as T;
}
export type User={id:string;email:string;name?:string;plan:string;onboarding_step?:number;email_verified?:boolean;two_factor_enabled?:boolean};
export type Summary={active_documents:number;clients:number;follow_ups_due:number;revenue_this_month:number;pending_total:number;pending_count:number;unread_notifications:number};
export type Activity={id:string;event_type:string;title:string;created_at:string};
export type Document={id:string;title:string;status:string;created_at:string};
export type Client={id:string;name:string;email:string;company?:string;status?:string};
export const authApi={
 signup:(body:{email:string;password:string;tos_accepted:true;newsletter_opt_in:boolean})=>api<{success:true;token:string;user:User}>("/api/auth/signup",{method:"POST",body}),
 login:(body:{email:string;password:string})=>api<{success:true;token?:string;user?:User;requires_2fa?:boolean;pre_2fa_token?:string}>("/api/auth/login",{method:"POST",body}),
 me:(token:string)=>api<{user:User}>("/api/auth/me",{token}),
 logout:(token:string)=>api("/api/auth/logout",{method:"POST",token}),
 verify:(token:string,code:string)=>api<{success:true;token:string}>("/api/auth/verify-email",{method:"POST",token,body:{code}}),
 resend:(token:string)=>api<{success:true;cooldown_seconds:number}>("/api/auth/resend-verification",{method:"POST",token})
};
export const appApi={
 summary:(t:string)=>api<Summary>("/api/dashboard/summary",{token:t}),
 activity:(t:string)=>api<{activity:Activity[]}>("/api/dashboard/activity?limit=10",{token:t}),
 proposals:(t:string)=>api<{data:Document[]}>("/api/proposals?status=&page=1&limit=20",{token:t}),
 clients:(t:string)=>api<{data:Client[]}>("/api/crm/clients?page=1",{token:t})
};