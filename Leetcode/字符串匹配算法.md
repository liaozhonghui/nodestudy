# 字符串匹配算法

javascript indexOf find
算法

## 单模式串匹配算法
BF算法
- 暴力匹配算法 O(n * m)
- 比较常用的字符串匹配算法，常用开发情况下， 模式串和主串的长度不是太长，而且代码实现比较简单 
RK算法
- BF算法+hash算法
- hash算法设计：
```
假设主串和模式串范围是a-z的小写字母
设置hash函数使用26进制方法，a = 0, b = 1, c = 2
比如 cba = 2 * 26 * 26 + 1 * 26 + 0 * 1 = 1353
进行匹配
查表计算26的m-1次方，提前计算好，放到数组中，[26^0, 26^1, 26^2, 26^(m - 1)]
相邻的hash存在相关的数学关系，h[i] = 26 * (h[i - 1] - 26^m-1 * s[i-1]) + 26^0 * (s[i+m-1]);
计算步骤：
1. 计算子串hash值，O(n), 扫描一遍主串，使用递推公式，进行求解
2. 比较模式串hash值和每个子串的hash值，比较复杂度为O(1), 总共需要比较n-m+1个字符串, 时间复杂度为O(n)
所以RK算法整体的时间复杂度为O(n)
异常情况：
模式串很长，对应的主串中的子串也很长，可能会超过整型数据可以表示的范围，如何解决？
答：26进制散列方法是没有散列冲突的，设计散列冲突的，解决超出整数范围的问题，使用散列冲突的数据进行处理，
将每个字母从小到大对应一个素数，进行相加。当匹配到散列数据相同时，再进行一次字符串比较，判断字符串是否相同，如果散列冲突概率较大，严重情况下会导致时间复杂度降低为O(n * m)
```

BM算法：文本编辑器中的查找功能?
坏字符原则，好后缀原则
1. 坏字符规则
- 按照模式串的下标，从后往前匹配， 把第一个没有匹配到的字符叫做坏字符
- 将坏字符在模式串中的下标记作si， 将坏字符匹配模式串的下标记作xi(不存在，记为-1)，那么模式串往后移动的位数就等于si-xi. 如果换字符在模式串中多次存在，则以最后一个匹配的为准
2. 好后缀规则
- 发现第一个不匹配的坏字符时，纪录已经匹配的好后缀{u}, 拿u在模式串中进行查找，如果匹配，则滑动到子串与主串中{u}对齐的位置，如果不匹配，查找模式串好前缀子串（检查模式串的前缀子串是否跟好后缀的后缀子串匹配），找到好前缀{v}, 则滑动到v对齐的位置
3. 计算往后移动的位数
当模式串和主串中的某个字符不匹配的时候，分别计算好后缀和坏字符往后滑动的位数，然后取两个数中最大的，作为模式串往后滑动的位数。而且这种处理方法还能有效避免往后滑动的位数可能是负数的情况。
4. BM代码的实际实现
- 坏字符查找需要利用散列表
- 好后缀规则
    - 核心点1： 在模式串中，查找跟好后缀匹配的另外一个子串， 以下标最大的为准
    - 核心点2： 在好后缀的后缀子串中，查找最长的、能跟模式串前缀子串匹配的后缀子串
```js
// b是模式串， bc表示散列表，m表示模式串b的长度
function generateBC(b, m , bc) {
    for (var i = 0; i < SIZE; i++) {
        bc[i] = -1;
    }
    for (var i = 0; i < m; ++i) {
        var ascii = m[i].charCodeAt();
        bc[ascii] = i; // 对于重复的字符串，后面的覆盖前面的
    }
}
function generateGS(b, m, suffix, prefix) {
    for (var i = 0; i < m; ++i) suffix[i] = -1, prefix = false;
    for (var i = 0; i < m - 1; ++i) {
        var j = i;
        var k = 0;
        while (j >= 0 && b[j] == b[m - 1 - k]) {
            --j;
            ++k;
            suffix[k] = j + 1;
        }
        if (j == -1) prefix[k] = true;
    }
}
// 主函数
function bm(a, n, b, m) {
    var SIZE = 256;
    var bc = [];
    for (var i = 0; i < SIZE; i++) bc[i] = 0;
    generateBC(b, m, bc); // 使用hash表记录每个字符的数据
    var suffix = [], prefix = [];
    for (var i = 0; i < m; i++) suffix = -1, prefix = false;
    generateGS(b, m, suffix, prefix);
    var i = 0;
    while (i < n - m) {
        var j = 0;
        for (j = m - 1; j >= 0; --j) {
            if (a[i + j] != b[j]) break;
        }
        if (j < 0) return i;
        // 坏字符原则计算移动距离，特殊情况会取负数
        var x = j - bc[a[i + j].charCodeAt()];
        var y = 0;
        if (j < m - 1) {
            y = moveByGS(j, m, suffix, prefix);
        }
        i  = i + Math.max(x, y);
    }
    return -1;
}
/**
 * 好后缀原则计算移动距离
*/
function moveByGS(j, m, suffix, prefix) {
    var k = m - 1 - j;
    if (suffix[k] != -1) return j - suffix[k] + 1;
    for (var r = j + 2; r <= m - 1; ++r) {
        if (prefix[m - r] == true) {
            return r;
        }
    }
    return m;
}
```

KMP算法
```java

// b表示模式串，m表示模式串的长度
private static int[] getNexts(char[] b, int m) {
  int[] next = new int[m];
  next[0] = -1;
  int k = -1;
  for (int i = 1; i < m; ++i) {
    while (k != -1 && b[k + 1] != b[i]) {
      k = next[k];
    }
    if (b[k + 1] == b[i]) {
      ++k;
    }
    next[i] = k;
  }
  return next;
}

// a, b分别是主串和模式串；n, m分别是主串和模式串的长度。
public static int kmp(char[] a, int n, char[] b, int m) {
  int[] next = getNexts(b, m);
  int j = 0;
  for (int i = 0; i < n; ++i) {
    while (j > 0 && a[i] != b[j]) { // 一直找到a[i]和b[j]
      j = next[j - 1] + 1;
    }
    if (a[i] == b[j]) {
      ++j;
    }
    if (j == m) { // 找到匹配模式串的了
      return i - m + 1;
    }
  }
  return -1;
}
```


## 多模式串匹配算法
trie树

ac自动机
