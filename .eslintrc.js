module.exports = {
  env: { es6: true, browser: true, node: true, jest: true },
  extends: ["plugin:@foxglove/base", "plugin:@foxglove/react", "plugin:@foxglove/jest"],
  settings: {
    "import/resolver": { webpack: { config: `${__dirname}/webpack.config.js` } },
  },
  globals: {
    RAVEN_URL: false, // injected via webpack
    GIT_INFO: false, // injected via webpack
    CURRENT_VERSION: false, // injected via webpack
    MINIMUM_CHROME_VERSION: false, // injected via webpack
  },
  rules: {
    curly: "error",
    "prettier/prettier": "error",
    "no-console": ["error", { allow: ["warn", "error", "debug"] }],
    "no-unused-vars": ["error", { args: "none", varsIgnorePattern: "^_" }],
    "no-underscore-dangle": ["error", { allowAfterThis: true }],
    "no-useless-computed-key": "off", // https://github.com/facebook/flow/issues/380#issuecomment-224380551
    yoda: "off", // https://github.com/RyanZim/eslint-config-problems/pull/1 and https://github.com/eslint/eslint/issues/10591
    // Some good ones that people really should be adding to import/recommended:
    "import/first": "error",
    "import/no-self-import": "error",
    "import/no-useless-path-segments": "error",
    "import/no-mutable-exports": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error", // https://github.com/benmosher/eslint-plugin-import/issues/242#issuecomment-230118951
    "no-duplicate-imports": "off", // False positives on flow type imports, so we use import/no-duplicates instead which handles them correctly.
    // TODO(JP): Fix this instead of disabling it:
    "import/no-named-as-default": "off",
    "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    "react-hooks/rules-of-hooks": "error",
    "filenames/match-exported": "off",
  },
  overrides: [
    // {
    //   files: "docs/src/jsx/**/*.js",
    //   rules: {
    //     "import/no-unresolved": "off",
    //   },
    // },
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@foxglove/typescript"],
      parserOptions: { project: "src/tsconfig.json" },
      rules: {
        //FIXME:
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
      },
    },

    {
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
      files: [
        "src/Worldview.tsx",
        "src/WorldviewContext.ts",
        "src/camera/CameraListener.tsx",
        "src/camera/CameraStore.test.ts",
        "src/camera/CameraStore.ts",
        "src/camera/camera.ts",
        "src/camera/cameraProject.ts",
        "src/commands/Arrows.tsx",
        "src/commands/DrawPolygon/PolygonBuilder.test.ts",
        "src/commands/FilledPolygons.tsx",
        "src/commands/GLTFScene.tsx",
        "src/commands/GLText.tsx",
        "src/commands/Lines.tsx",
        "src/commands/Triangles.tsx",
        "src/stories/Cubes.stories.tsx",
        "src/stories/assertionStories/GLText.stories.tsx",
        "src/stories/util.ts",
        "src/stories/worldviewAssertionUtils.tsx",
        "src/types/index.ts",
        "src/utils/Dimensions.tsx",
        "src/utils/HitmapObjectIdManager.test.ts",
        "src/utils/HitmapObjectIdManager.ts",
        "src/utils/commandUtils.ts",
        "src/utils/draco.ts",
        "src/utils/eulerFromQuaternion.ts",
        "src/utils/fromGeometry.ts",
        "src/utils/getChildrenForHitmapDefaults.test.ts",
        "src/utils/parseGLB.ts",
        "src/utils/queuePromise.ts",
        "src/utils/signal.ts",
        "src/utils/withRenderStateOverrides.ts",
      ],
    },
    {
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
      files: [
        "src/Worldview.tsx",
        "src/WorldviewContext.ts",
        "src/camera/CameraListener.tsx",
        "src/camera/CameraStore.ts",
        "src/camera/camera.ts",
        "src/camera/cameraProject.ts",
        "src/commands/Arrows.tsx",
        "src/commands/Axes.tsx",
        "src/commands/Command.tsx",
        "src/commands/Cones.tsx",
        "src/commands/Cubes.tsx",
        "src/commands/Cylinders.tsx",
        "src/commands/DrawPolygon/PolygonBuilder.ts",
        "src/commands/DrawPolygon/index.tsx",
        "src/commands/FilledPolygons.tsx",
        "src/commands/GLTFScene.tsx",
        "src/commands/GLText.tsx",
        "src/commands/Grid.tsx",
        "src/commands/Lines.tsx",
        "src/commands/Overlay.tsx",
        "src/commands/Points.tsx",
        "src/commands/Spheres.tsx",
        "src/commands/Text.tsx",
        "src/commands/Triangles.tsx",
        "src/stories/Container.tsx",
        "src/stories/util.ts",
        "src/stories/withRange.tsx",
        "src/stories/worldviewAssertionUtils.tsx",
        "src/utils/Bounds.ts",
        "src/utils/Dimensions.tsx",
        "src/utils/Raycast.ts",
        "src/utils/commandUtils.ts",
        "src/utils/common.ts",
        "src/utils/draco.ts",
        "src/utils/fromGeometry.ts",
        "src/utils/getChildrenForHitmapDefaults.ts",
        "src/utils/withRenderStateOverrides.ts",
      ],
    },
  ],
};
