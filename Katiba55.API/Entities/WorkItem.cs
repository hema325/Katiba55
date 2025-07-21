namespace Katiba55.API.Entities
{
    public class WorkItem: BaseEntity
    {
        // القيمة الكلية فلوس
        public decimal TotalValue { get; set; }
        // القيمة المنفذة فلوس
        public decimal ExecutedValue { get; set; }
        // الوزن النسبى => البند واخد كام نسبة تنفيذ من العمل
        public decimal RelativeWeight { get; set; } // calculated
        // نسبة التنفيذ الفعلية
        public decimal ExecutionPercent { get; set; } // calculated
        public DateTime ExecutionDate { get; set; } // calculated
        // نسبة التنفيذ الفعلية بالنسبة لباقى البنود
        public decimal RelativeExecutionPercent { get; set; } // calculated
        public ExecutionStatus ExecutionStatus { get; set; } 

        public int WorkId { get; set; }
        public Work Work { get; set; }

        public int ItemId { get; set; }
        public Item Item { get; set; }
    }
}
