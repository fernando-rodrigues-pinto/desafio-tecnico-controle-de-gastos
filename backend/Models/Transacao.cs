using System.Text.Json.Serialization;

namespace backend.Models
{
    public enum TipoTransacao
    {
        Receita,
        Despesa
    }

    public class Transacao
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TipoTransacao Tipo { get; set; }

        // Foreign Key
        public int PessoaId { get; set; }

        // Propriedade de navegação
        public Pessoa? Pessoa { get; set; }
    }
}