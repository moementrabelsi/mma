class Product {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.category = data.category;
    this.subCategory = data.subCategory;
    this.description = data.description;
    this.image = data.image;
    this.price = data.price || 0;
    this.inStock = data.inStock !== undefined ? data.inStock : true;
    this.attributes = data.attributes || {};
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  validate() {
    const errors = [];

    if (!this.name || this.name.trim().length === 0) {
      errors.push('Product name is required');
    }

    if (!this.category) {
      errors.push('Category is required');
    }

    if (!this.subCategory) {
      errors.push('Subcategory is required');
    }

    if (!this.description || this.description.trim().length === 0) {
      errors.push('Description is required');
    }

    if (!this.image || this.image.trim().length === 0) {
      errors.push('Image URL is required');
    }

    if (typeof this.price !== 'number' || this.price < 0) {
      errors.push('Price must be a positive number');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    return true;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      subCategory: this.subCategory,
      description: this.description,
      image: this.image,
      price: this.price,
      inStock: this.inStock,
      attributes: this.attributes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Product;



