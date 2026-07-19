using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }

        // Relacionamento: Uma pessoa pode ter várias transações
        [JsonIgnore] // Evita referência circular ao serializar para JSON
        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}