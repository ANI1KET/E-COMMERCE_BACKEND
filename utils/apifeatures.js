class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.keyword) {
            const keyword = this.queryStr.keyword
                ? {
                    "$or": [
                        {
                            name: { '$regex': this.queryStr.keyword, "$options": "i" }
                        },
                        {
                            category: { '$regex': this.queryStr.keyword, "$options": "i" }
                        }
                    ],
                }
                : {};
            this.query = this.query.find({ ...keyword });
            return this;
        }
        else {
            const category = this.queryStr.category
                ? {
                    category: { '$regex': this.queryStr.category, "$options": "i" }
                }
                : {};
            this.query = this.query.find({ ...category });
            return this;
        }
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "limit", "category"];

        removeFields.forEach((key) => delete queryCopy[key]);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

export default ApiFeatures;