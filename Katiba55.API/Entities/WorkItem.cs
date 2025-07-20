namespace Katiba55.API.Entities
{
    public class WorkItem: BaseEntity
    {
        // قيمة البند
        //public decimal TotalValue { get; set; }
        //// القيمة المنفذة
        //public decimal ExecutedValue { get; set; }
        //// قيمة المقايسة الكلية
        //public decimal TotalContractValue { get; set; }

        public double? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public ExecutionStatus ExecutionStatus { get; set; }

        public int WorkId { get; set; }
        public Work Work { get; set; }

        public int ItemId { get; set; }
        public Item Item { get; set; }

        public ICollection<WorkItemExecutionHistory>? ExecutionHistories { get; set; }


        // derived props 
        //public double RelativeWeight
        //{
        //    get
        //    {
        //        if (TotalContractValue == 0) return 0;
        //        return (double)(TotalValue / TotalContractValue) * 100;
        //    }
        //}
    }
}
