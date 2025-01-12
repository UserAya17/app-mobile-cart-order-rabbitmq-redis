using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using RabbitMQ.Client;



public class RabbitMqService
{
  /*  private readonly IConnection _connection;
    private readonly IModel _channel;

    public RabbitMqService()
    {
        var factory = new ConnectionFactory() { HostName = "localhost" };
        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();
    }

    public void SendCartToOrderService(Cart cart)
    {
        _channel.QueueDeclare(queue: "cartQueue", durable: false, exclusive: false, autoDelete: false, arguments: null);

        var message = JsonSerializer.Serialize(cart);
        var body = Encoding.UTF8.GetBytes(message);

        _channel.BasicPublish(exchange: "", routingKey: "cartQueue", basicProperties: null, body: body);
    }
    */
}
