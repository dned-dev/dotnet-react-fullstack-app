using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Models
{
    public class QuizDbContext:DbContext
    {
        // constructor
        public QuizDbContext(DbContextOptions<QuizDbContext> options):base(options) {}

        public DbSet<Question> Questions { get; set; }
        
        public DbSet<Participant> Participants { get; set; }

    }
}
