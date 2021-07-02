<template>
  <div class="app-container">
    <h1>基础类型</h1>
    <el-card class="card" v-for="(item, index) in dataType" :key="index">
      <div>
        {{ `${item.title} - ${item.type}` }}
      </div>
      <pre v-highlightjs>
        <code class="typescript"> {{ item.demo }} </code>
      </pre>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataType: [
        { title: '布尔型', type: 'boolean', demo: `let isBool: boolean = false;` },
        { title: '数字', type: 'number', demo: `let num: number = 1111;` },
        { title: '字符串', type: 'string', demo: `let str: string = '字符串';` },
        { title: '数组', type: 'Array', demo: 'let list: number[] = [1,2,3];\n let list2: Array<number> = [4,5,6];' },
        { title: '元组', type: 'Tuple', demo: 'let x: [string, number];\n x = ["hello", 1]; //ok;\n x = [1, "hello"]; //error' },
        { title: '枚举', type: 'enum', demo: 'enum Color {Red, Green, Blue};\n let c: Color = Color.Green;' },
      ],
    };
  },
};
</script>


<style scoped>
.card {
  margin: 20px 0;
}
</style>