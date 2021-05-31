module.exports = async function (context, req, product) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.id && product) {
        context.res = {
            status: 200,
            body: product
        }
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass in a valid \"id\" query parameter"
        }
    }
};
