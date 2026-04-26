const StatsManager = {
  statsId: null,
  
  async getStatsObject() {
    try {
      const result = await trickleListObjects('stats', 1, true);
      if (result.items?.length > 0) {
        this.statsId = result.items[0].objectId;
        return result.items[0];
      }
      const newStats = await trickleCreateObject('stats', { visitors: 0, downloads: 0 });
      this.statsId = newStats.objectId;
      return newStats;
    } catch (e) { console.error(e); return null; }
  },

  async getStats() {
    const obj = await this.getStatsObject();
    return obj?.objectData || { visitors: 0, downloads: 0 };
  },

  async incrementVisitors() {
    try {
      const obj = await this.getStatsObject();
      if (obj) {
        const newVisitors = (obj.objectData.visitors || 0) + 1;
        await trickleUpdateObject('stats', obj.objectId, { ...obj.objectData, visitors: newVisitors });
      }
    } catch (e) { console.error(e); }
  },

  async incrementDownloads() {
    try {
      const obj = await this.getStatsObject();
      if (obj) {
        const newDownloads = (obj.objectData.downloads || 0) + 1;
        await trickleUpdateObject('stats', obj.objectId, { ...obj.objectData, downloads: newDownloads });
      }
    } catch (e) { console.error(e); }
  }
};
