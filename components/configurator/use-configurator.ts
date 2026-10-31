"use client";

import * as React from "react";
import {
  ConfiguratorState,
  DEFAULT_CONFIGURATOR_STATE,
  SWATCH_OPTIONS,
  SurfaceFinish,
} from "./configurator-types";

export function useConfiguratorState(
  initialState: ConfiguratorState = DEFAULT_CONFIGURATOR_STATE
) {
  const [config, setConfig] = React.useState<ConfiguratorState>(initialState);

  const setAccentColor = React.useCallback((colorId: string) => {
    const swatch = SWATCH_OPTIONS.find((s) => s.id === colorId);
    if (!swatch) return;

    setConfig((prev) => ({
      ...prev,
      accentColorId: swatch.id,
      accentHex: swatch.hex,
      isOriginal: Boolean(swatch.isOriginal),
    }));
  }, []);

  const setRgbEnabled = React.useCallback((enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      rgbEnabled: enabled,
    }));
  }, []);

  const setFinish = React.useCallback((finish: SurfaceFinish) => {
    setConfig((prev) => ({
      ...prev,
      finish,
    }));
  }, []);

  const resetConfig = React.useCallback(() => {
    setConfig(DEFAULT_CONFIGURATOR_STATE);
  }, []);

  return {
    config,
    setAccentColor,
    setRgbEnabled,
    setFinish,
    resetConfig,
  };
}

