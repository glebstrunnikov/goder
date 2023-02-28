// Global constants
const globalRows = 10; // number of rows
const globalCols = 16; // number of columns
const globalGrowth = 0.1; // growth modifer, determines the speed of every sells' stats' growth
const globalSpread = 0.1;
const globalMinRel = 0.01;

// forming the global map
const globalMap = {};
for (let i = 1; i <= globalRows; i++) {
  const iR = i;
  for (let i = 1; i <= globalCols; i++) {
    const iRiC = "cell" + iR + "x" + i;
    globalMap[iRiC] = {
      pop: 0,
      fert: 0,
      tech: 0,
      popSpare: 0,
      localRel: {},
    };
  }
}

// a function to find the ids of the cell's neighbours
function findCellMates(cellId) {
  const reRow = /x.*/g;
  const row = parseInt(cellId.slice(4).replaceAll(reRow, ""));
  const reCol = /.*?x/g;
  const col = parseInt(cellId.slice(4).replaceAll(reCol, ""));

  const cellMates = [];
  if (row > 1) {
    cellMates.push(`cell${row - 1}x${col}`);
  }
  if (col < globalCols) {
    cellMates.push(`cell${row}x${col + 1}`);
  }
  if (row < globalRows) {
    cellMates.push(`cell${row + 1}x${col}`);
  }
  if (col > 1) {
    cellMates.push(`cell${row}x${col - 1}`);
  }
  return cellMates;
}

const global = {
  globalGrowth,
  globalRows,
  globalCols,
  globalMap,
  globalSpread,
  globalMinRel,
  findCellMates,
};
export default global;
