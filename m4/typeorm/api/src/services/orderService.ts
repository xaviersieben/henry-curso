import { OrderDto } from "../dtos/order.dto";
import Order from "../entities/Order";
import {
  OrderRepository,
  ProductRepository,
  UserRepository,
} from "../config/data-source";

export const createOrderService = async (
  createOrderDto: OrderDto
): Promise<Order> => {
  // Realizar la búsqueda de productos en paralelo
  const productPromises = createOrderDto.products.map((id) =>
    ProductRepository.findOneBy({ id })
  );
  const productsF = await Promise.all(productPromises);

  // Validación de productos
  if (productsF.includes(null)) throw new Error("Algunos Productos no existen");

  // Búsqueda y validación del usuario
  const userF = await UserRepository.findOneBy({ id: createOrderDto.userId });
  if (!userF) throw new Error("Usuario no encontrado");

  // Creación del nuevo pedido
  const newOrder = OrderRepository.create({
    status: "approved",
    date: new Date(),
    user: userF,
    products: productsF as any[], // TypeScript necesita el casting si products no es un array de tipo `Product`
  });

  // Guardar el pedido en la base de datos
  await OrderRepository.save(newOrder);
  return newOrder;
};
