<template>
  <div class="page-grid">
    <el-table :border="border" :data="list" ref="pageGrid" @row-click="onRowClick" @sort-change="onSortChange" :row-style="rowStyle">
      <el-table-column align="center" type="selection" v-if="checkedRow" width="55"> </el-table-column>
      <el-table-column :align="item.align || 'left'" :fixed="item.fixed" :key="index" :label="item.label" :min-width="item.minWidth || 160" :prop="item.prop" :sortable="item.sort" v-for="(item, index) in columns">
        <template v-slot="{ row, $index }">
          <slot :name="item.prop" :row="row" :index="$index">
            <div v-if="item.timeFormat">
              {{ row[item.prop] | timestamp }}
            </div>
            <div v-else class="text-wrap">
              {{ row[item.prop] }}
            </div>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="page" :page-size="pageSize" :page-sizes="pageSizes" :total="total" @current-change="onPageChange" @size-change="onSizeChange" background :layout="layout" style="text-align: center"> </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'uc-page-grid',
  props: {
    border: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: [],
    },
    rowStyle: {
      type: Function,
      default: () => {},
    },
    route: {
      type: String,
      default: '',
    },
    query: {
      type: Object,
      default: () => {},
    },
    checkedRow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
      total: 2000,
      page: 1,
      pageSize: 20,
      pageSizes: [10, 20, 30, 40, 50],
      layout: 'prev, pager, next, jumper, sizes',
    };
  },
  computed: {
    checkedRows() {
      return this.$refs.pageGrid.selection;
    },
  },
  methods: {
    async onChange() {
      this.$cloading.show();
      let res;
      try {
        res = await this.$get(this.route, {
          ...this.query,
          page: this.page,
          pagesize: this.pageSize,
        });
        this.list = res.list;
      } catch (err) {
        this.$message.error(err);
      } finally {
        this.$cloading.hide();
        this.$emit('onPageChange', this.list, res);
      }
    },
    onRowClick(row) {
      if (!window.getSelection().toString()) {
        this.$emit('onRowClick', row);
      }
    },
    onSortChange(data) {
      this.$emit('onSortChange', data);
    },
    onPageChange(page) {
      this.page = page;
      this.onChange();
    },
    onSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.total = pageSize * 100;
      this.onChange();
    },
  },
  watch: {
    query() {
      this.onChange();
    },
  },
};
</script>

<style scoped>
.text-wrap {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
