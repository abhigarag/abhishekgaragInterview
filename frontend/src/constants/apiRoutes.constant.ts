export const APIRoutes:Map<string,Record<string,string>>=new Map([
    ["login",{url:"/login",method:"POST"}],
    ["vote",{url:"/events/vote/",method:"PUT"}],
    ["createEvent",{url:"/events",method:"POST"}],
    ["getMyEvent",{url:"/events/myEvents",method:"GET"}],
    ["getAllEvents",{url:"/events",method:"GET"}]
])