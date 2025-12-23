class Category {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description || '';
    this.image = data.image || '';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  validate() {
    const errors = [];

    if (!this.name || this.name.trim().length === 0) {
      errors.push('Category name is required');
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
      description: this.description,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Category;



