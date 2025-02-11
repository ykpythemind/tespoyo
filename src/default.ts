type CommandConfig = {
  file?: string;
  line?: string;
  all?: string;
};

export const languageDefault: Record<string, CommandConfig> = {
  javascript: {
    file: "npm run test ${file}", // TODO: これだとjestで動かないので改良が必要
    line: "npm run test ${file}:${line}", // 同上
    all: "npm run test",
  },
  typescript: {
    file: "npm run test ${file}",
    line: "npm run test ${file}:${line}",
    all: "npm run test",
  },
  ruby: {
    file: "bundle exec rspec ${file}",
    line: "bundle exec rspec ${file}:${line}",
    all: "bundle exec rspec",
  },
};
