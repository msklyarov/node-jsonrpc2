class RateLimiter {
  constructor(msPassedBetween, maxPerInterval, msInterval) {

    this.msPassedBetween = msPassedBetween || 0;
    this.maxPerInterval = maxPerInterval || Number.MAX_SAFE_INTEGER;
    this.msInterval = msInterval || 60 * 1000;
    this.time_lastCall = null;
    this.time_lastIntervalStart = null;
    this.count_sinceLastIntervalStart = null;
  }

  check() {
    const dateNow = new Date();
    if (!this.time_lastCall) {
      this.time_lastCall = dateNow;
      this.time_lastIntervalStart = dateNow;
      this.count_sinceLastIntervalStart = 1;
      return true;
    }
    else {
      if (dateNow.getTime() - this.time_lastCall.getTime() < this.msPassedBetween) {
        return false;
      }
      if (this.count_sinceLastIntervalStart + 1 > this.maxPerInterval) {
        if (dateNow.getTime() - this.time_lastIntervalStart.getTime() < this.msInterval) {
          return false;
        }
        else {
          this.time_lastCall = dateNow;
          this.time_lastIntervalStart = dateNow;
          this.count_sinceLastIntervalStart = 1;
          return true;
        }
      }
      else {
        this.time_lastCall = dateNow;
        this.count_sinceLastIntervalStart++;

        return true;
      }
    }
  }
}
module.exports = RateLimiter;