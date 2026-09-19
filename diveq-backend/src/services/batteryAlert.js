const checkBatteryStatus = (batteryLevel) => {
  if (batteryLevel < 10) {
    return {
      batteryLevel,
      batteryStatus: "CRITICAL",
      warning: "Critical battery level",
    };
  }

  if (batteryLevel < 20) {
    return {
      batteryLevel,
      batteryStatus: "WARNING",
      warning: "Low battery level",
    };
  }

  if (batteryLevel < 30) {
    return {
      batteryLevel,
      batteryStatus: "CAUTION",
      warning: "Battery level getting low",
    };
  }

  return {
    batteryLevel,
    batteryStatus: "NORMAL",
    warning: null,
  };
};

module.exports = {
  checkBatteryStatus,
};