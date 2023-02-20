import { Injectable } from '@nestjs/common';
import { category, Prisma, product } from '@prisma/client';
import { Pagination } from 'src/dto/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaPaginate } from 'src/prisma/utils';
import { CreateCategoryInput, CreateProductInput } from './dto/create-product.input';
import { UpdateCategoryInput, UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  create({ categories, ...data }: CreateProductInput) {
    return this.prisma.product.create({
      data: {
        ...data,
        product_category: {
          createMany: {
            data: (categories || []).map(category_id => ({ category_id }))
          }
        }
      }
    })
  }

  async findAll(query: Pagination) {

    const allProducts = await prismaPaginate<Prisma.productFindManyArgs, product>({
      model: this.prisma.product,
      query,
      searchFields: ['name', 'sku'],
      args: {
        include: {
          product_category: {
            include: {
              category: true
            }
          }
        }
      }
    })

    console.log(allProducts.docs[0])

    return allProducts
  }

  async findOne(id: string) {

    const product = await this.prisma.product.findFirst({
      where: { id },
      include: {
        product_category: {
          select: { category: true }
        }
      }
    })
    console.log(product.product_category)
    return {
      ...product,
      categories: product.product_category.map(cat => cat.category)
    }

  }

  update(updateProductInput: UpdateProductInput) {
    return `This action updates a  product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }


  // ================== Category ===================== 

  async createCategory(data: CreateCategoryInput) {
    return this.prisma.category.create({ data })
  }

  async updateCategory({ id, ...data }: UpdateCategoryInput) {
    return this.prisma.category.update({
      where: { id },
      data
    })
  }

  async findAllCategories(query: Pagination) {

    const allCategories = await prismaPaginate<Prisma.categoryFindManyArgs, category>({
      model: this.prisma.category,
      query,
      searchFields: ['name'],
    })

    return allCategories

  }


}
