using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace OrderService.Services
{
    /*
    public class RabbitMqListener
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;

        public RabbitMqListener()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
        }

        public void ListenForCartMessages()
        {
            _channel.QueueDeclare(queue: "cartQueue", durable: false, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);

                // Désérialisation du message en un objet Cart
                var cart = JsonSerializer.Deserialize<Cart>(message);

                // Traiter la commande et l'enregistrer
                ProcessCart(cart);
            };

            _channel.BasicConsume(queue: "cartQueue", autoAck: true, consumer: consumer);
        }

        private void ProcessCart(Cart cart)
        {
            // Logique pour créer la commande à partir du panier reçu
            var order = new Order
            {
                UserId = cart.UserId,
                OrderDate = DateTime.Now,
                TotalAmount = cart.Items.Sum(item => item.Quantity * 10.00m),
                Items = cart.Items.Select(item => new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = 10.00m 
                }).ToList()
            };

            // Enregistrez la commande dans la base de données
            SaveOrder(order);
        }

        private void SaveOrder(Order order)
        {
            // Logique pour enregistrer la commande dans la base de données
        }
    }
    */
}

