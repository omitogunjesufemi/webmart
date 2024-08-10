import { ObjectId } from 'mongodb';
import dbClient from '../storage/db';

class CategoryService {
    static categoryCollection = dbClient.db.collection('categories');

    static async getAllCategories() {
        try {
            const allCategories = await this.categoryCollection.find({}).toArray();
            return allCategories;  
        } catch (error) {
            return ({'error': `Failed to get categries: ${error}`});
        }
    }

    static async getCategoryByID(categoryID) {
        try {
            const category = await this.categoryCollection.findOne({_id: new ObjectId(categoryID)});
            return category;
        } catch (error) {
            return ({'error': `Failed to get category: ${error}`});
        }
    }

    static async createCategory(categoryObj) {
        if (!categoryObj.name) {
            return ({'error': 'Missing category name'});
        }

        const category = {
            name: categoryObj.name,
            description: categoryObj.description,
        };

        try {
            const newCategory = await this.categoryCollection.insertOne(category);
            return newCategory.insertedId;
        } catch (error) {
            return ({'error': `Failed to create category: ${error}`});
        }
    }

    static async createManyCategories(listOfCategoryObj) {
        if (Object.entries(listOfCategoryObj).length <= 0) {
            return ({'error': 'List of categories can\'t be empty'});
        }

        try {
            const newCategories = await this.categoryCollection.insertMany(listOfCategoryObj);
            return newCategories;   
        } catch (error) {
            return ({'error': `Failed to create categories: ${error}`});
        }
    }

    static async updateCategoryByID(categoryID, updatedObj) {
        try {
            const categoryObj = this.getCategoryByID(categoryID);
            const updatedCategory = await this.categoryCollection.updateOne(categoryObj, updatedObj);
            return updatedCategory;
        } catch (error) {
            return ({'error': `Failed to update category: ${error}`});
        }
    }

    static async updateCategory(categoryObj, updatedObj) {
        try {
            const updatedCategory = await this.categoryCollection.updateOne(categoryObj, updatedObj);
            return updatedCategory;
        } catch (error) {
            return ({'error': `Failed to update category: ${error}`});
        }
    }

    static async deleteCategoryByID(categoryID) {
        try {
            const category = this.getCategoryByID(categoryID);
            const deleted = await this.categoryCollection.deleteOne(category);
            return deleted.acknowledged;
        } catch (error) {
            return ({'error': `Failed to delete category: ${error}`});
        }
    }

    static async deleteManyCategories(listOfCategoryObj) {
    }
}

export default CategoryService;