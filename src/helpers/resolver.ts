import { parse } from "./parser";

export const resolver = (callback:any, fields:string[] = [])=>{
    const result = (root, args, context, info)=>{
        const req:any = {};
        req.body = {...(root || {})};
        req.body = {...req.body, ...(args || {})};
        const parsedParams = parse(req, fields);
        console.log("ParsedParams:", req.body, parsedParams);
        return callback(parsedParams);
    };
    return result;
}