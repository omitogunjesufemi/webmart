import CategoryService from '../services/CategoryService';

class CategoryController {
    static async viewCategories(request, response) {
        const categories = await CategoryService.getAllCategories();
        return response.status(200).json(categories);
    }

    static async viewCategory(request, response) {
        const categoryID = request.params.id;
        const category = await CategoryService.getCategoryByID(categoryID);
        return response.status(200).json(category);
    }

    static async newCategory(request, response) {
        const reqObj = request.body;
        const result = await CategoryService.createCategory(reqObj);
        return response.json(result);
    }

    static async editCategory(request, response) {
        const reqObj = request.body;
        const categoryID = request.params.id;
        const result = await CategoryService.updateCategoryByID(categoryID, reqObj);

        return response.json(result);
    }

    static async deleteCategory(request, response) {
        const categoryID = request.params.id;
        await CategoryService.deleteCategoryByID(categoryID);
    }
}

export default CategoryController;
