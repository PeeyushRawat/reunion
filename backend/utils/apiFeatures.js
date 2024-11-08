class APIFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        const city = this.queryStr.city ? {
            city: {
                $regex: this.queryStr.city,
                $options: 'i'
            }
        } : {}

        const propertyType = this.queryStr.propertyType ? {
            propertyType: {
                $regex: this.queryStr.propertyType,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({...keyword});
        this.query = this.query.find({...city})
        this.query = this.query.find({...propertyType})
        return this;
    }

    filter(){

        const queryCopy = { ...this.queryStr};

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page', 'city', 'propertyType']
        removeFields.forEach(el => delete queryCopy[el]);

        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage -1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;