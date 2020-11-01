# 版本发布

## 解释

需要更新版本编号，可以直接手动在`package.json`中更改`version`字段。当然，也可以使用命令

```shell
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]
```

此命令，会在`git commit`中生成一条记录，并标记`tag`。

解释下以下三种：`patch`、`minor`、`major`。

目前node版本大都是使用语义化版本(semver)作为一个标准。

对于第一次发版`"version": "1.0.0"`，之后升级，使用对应的类型。

```shell
patch: 补丁发布，向后兼容的bug修复，增加第三个数字。如 1.0.1

minor: 轻微发布，向后兼容的新特性，将中间数字增加并将最后一位数重置为 0。如 1.1.0

major: 重大发布，破坏向下兼容的变化，将第一个数字增加，并将后两位数重置为 0。如 2.0.0
```

## 常用命令

- patch 命令

```shell
npm version patch
```

- minor 命令

```shell
npm version minor
```

- major 命令

```shell
npm version major
```
