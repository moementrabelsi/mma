class SubCategory {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.categoryId = data.categoryId;
    this.description = data.description || '';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  validate() {
    const errors = [];

    if (!this.name || this.name.trim().length === 0) {
      errors.push('Subcategory name is required');
    }

    if (!this.categoryId) {
      errors.push('Category ID is required');
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
      categoryId: this.categoryId,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = SubCategory;



