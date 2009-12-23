function Session(initData)
{
  for (x in initData) {
    this[x] = initData[x];
  }

  this.dayGroup = function()
  {
    return formatting.weekday(this.start);
  }

  this.timeGroup = function()
  {
    return formatting.shortTime(this.start);
  }

}


SortSessions = {

  byStartTime: function(sessions)
  {
    return sessions.sort(function(a, b) {
      if (a.startTime > b.startTime) {
        return 1;
      } else if (a.startTime < b.startTime) {
        return -1;
      } else {
        return a.title > b.title ? 1 : -1;
      }
    });
  }

};


GroupSessions = {

  byDayGroup: function(sessions)
  {
    return $.groupBy(sessions, function(rec) {
      return rec.dayGroup();
    });
  },

  byTimeGroup: function(sessions)
  {
    return $.groupBy(sessions, function(rec) {
      return rec.timeGroup();
    });
  }

};

