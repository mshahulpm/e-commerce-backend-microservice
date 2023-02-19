import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

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

  findAll() {
    return `This action returns all products`;
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

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
