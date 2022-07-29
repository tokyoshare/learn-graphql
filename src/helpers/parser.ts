const parseJson = (code:any)=>{
    try {
        if(typeof(code)==="string"){
            return JSON.parse(code);
        }
        if(typeof(code)==="object"){
            return code;
        }
    } catch (e) {
        return {};
    }
}
const parse = (req: any, fields: string[], defaultValues: any[] = []) => {
    const header = req.headers || {};
    const body = parseJson(req.body || {});
    const query = {...(req.queryStringParameters||{}), ...(req.query||{})};
    const pathParams = req.pathParameters || {};
    const allData = {
        ...header,
        ...query,
        ...body,
        ...pathParams
    };

    let result: {
        [key: string]: any;
    } = {};

    if (fields.length > 0) {
        fields.forEach((field, index) => {
            if (allData[field] !== undefined) {
                result[field] = allData[field];
            } else if (defaultValues.length > index) {
                result[field] = defaultValues[index];
            } else {
                result[field] = undefined;
            }
        });
    } else {
        result = allData;
    }

    return result;
};

export { parse };
