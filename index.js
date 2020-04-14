module.exports = (config = Object) => {
    return (req, res, next) => {
        let offset = parseInt(req.query.offset) || (config.offset || 0);
        let limit = parseInt(req.query.limit) || (config.limit || 50);
        let page = parseInt(req.query.page) || (config.page || 1);
        let sort = req.query.sort || (config.sort || 'createdAt');
        let desc = req.query.desc == 'true' ? (config.descTrue || 'desc') : (config.descFalse || 'asc');

        page = limit * (page - 1);

        if(offset <= 0) offset = 0;

        if(page <= 0) page = 0;

        if (limit > (config.maxlimit || 100)) limit = (config.maxlimit || 100);

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