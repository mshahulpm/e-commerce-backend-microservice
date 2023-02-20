import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { PaginatedProduct, Product } from './entities/product.entity';
import { CreateCategoryInput, CreateProductInput } from './dto/create-product.input';
import { UpdateCategoryInput, UpdateProductInput } from './dto/update-product.input';
import { Pagination } from 'src/dto/common';
import { Category, PaginatedCategories } from './entities/category';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') data: CreateProductInput) {
    return this.productsService.create(data);
  }

  @Query(() => PaginatedProduct)
  getAllProducts(@Args('Pagination') query: Pagination) {
    return this.productsService.findAll(query);
  }

  @Query(() => Product)
  getProduct(@Args('id', { type: () => String }) id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }

  @Mutation(() => Category)
  createCategory(@Args('category') data: CreateCategoryInput) {
    return this.productsService.createCategory(data)
  }

  @Mutation(() => Category)
  updateCategory(@Args('category') data: UpdateCategoryInput) {
    return this.productsService.updateCategory(data)
  }

  @Query(() => PaginatedCategories)
  getAllCategories(@Args('pagination') query: Pagination) {
    return this.productsService.findAllCategories(query)
  }

}
