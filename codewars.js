function countSmaller(nums) {
    const result = new Array(nums.length).fill(0);
  
    function mergeSort(arr) {
      if (arr.length <= 1) {
        return arr;
      }
  
      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);
  
      const sortedLeft = mergeSort(left);
      const sortedRight = mergeSort(right);
  
      return merge(sortedLeft, sortedRight);
    }
  
    function merge(left, right) {
      const merged = [];
      let countSmallerRight = 0;
  
      for (let i = 0; i < left.length; i++) {
        while (countSmallerRight < right.length && right[countSmallerRight][0] < left[i][0]) {
          countSmallerRight++;
        }
  
        result[left[i][1]] += countSmallerRight;
      }
  
      let i = 0, j = 0;
      while (i < left.length || j < right.length) {
        if (i === left.length) {
          merged.push(right[j]);
          j++;
        } else if (j === right.length) {
          merged.push(left[i]);
          i++;
        } else if (left[i][0] <= right[j][0]) {
          merged.push(left[i]);
          i++;
        } else {
          merged.push(right[j]);
          j++;
        }
      }
  
      return merged;
    }
  
    const indexedNums = nums.map((value, index) => [value, index]);
    mergeSort(indexedNums);
  
    return result;
  }
  
  // Example usage:
  const nums = [5, 2, 6, 1];
  const result = countSmaller(nums);
  console.log(result); // Output: [2, 1, 1, 0]