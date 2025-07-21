
namespace Katiba55.API.Services.ProgressUpdater
{
    public interface IProgressUpdaterService
    {
        Task UpdateProjectAsync(int workId);
        Task UpdateWorkAsync(int workId);
        Task UpdateWorkItemAsync(int workItemId);
        Task UpdateWorkItemsAsync(int workId);
    }
}
