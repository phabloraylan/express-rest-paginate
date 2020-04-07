module.exports = (config = Object) => {
    return (req, res, next) => {
        let offset = parseInt(req.query.offset) || (config.offset || 0);
        let limit = parseInt(req.query.limit) || (config.limit || 10);
        let page = limit * offset;
        let sort = req.query.sort || (config.sort || 'createdAt');
        let desc = req.query.desc == 'true' ? (config.descTrue || 'desc') : (config.descFalse || 'asc');

        if (limit > (config.maxlimit || 100)) {
            limit = (config.maxlimit || 100);
        }

        req.paginate = {
            offset,
            limit,
            sort,
            desc,
            page
        };

        next();
    }
}