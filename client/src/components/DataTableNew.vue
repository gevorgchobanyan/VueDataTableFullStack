<template>
<!-- DEVELOPING REUSABLE TABLE COMPONENT with SLOTS-->
	<div>
		
		<template v-if="searchTable!=undefined">
			<input 
				type="search" 
				id="tsearch" 
				name="tsearch"
				class="form-control mr-sm-2"
				placeholder="Search by name"
				v-model="searchQuery"
				>
		</template>

		<table class="table" id="myTable">
			<tr id="header-row">
				<th v-for="(item, index) in arrOfHeaders" :key="index">
					<slot name="header-cell" :item="item">
						{{item}}
					</slot>
				</th>
			</tr>
			<tr id="row" v-for="(obj, index) in resultQuery" :key="index">
					<slot name="row" :row="obj">
						<td class="cell" v-for="(prop, key) in obj" :key="key">
							<slot name="cell" :cellValue="prop" :cellKey="key">
								{{prop}}
							</slot> 
						</td>
					</slot>
			</tr>


		</table>

		<template v-if="paginationObj">
			<ul class="pagination">
				<li class="page-item" id="previous"><a class="page-link" href="#" @click="paginate(pageNumber-1)">Previous</a></li>
				<template v-for="n in totalPages" :key="n">
					<li class="page-item"><a class="page-link" href="#" @click="paginate(n)">{{n}}</a></li>
				</template>
				<li class="page-item" id="next"><a class="page-link" href="#" @click="paginate(pageNumber+1)">Next</a></li>
			</ul>
		</template>
			


	</div>
</template>

<script>
export default {
	props: ['arrOfRowObjects', 'arrOfHeaders', 'searchTable', 'paginationObj'],
  data() {
    return {
			searchQuery: null,
			//

			disabled: false,
			displayRows: this.arrOfRowObjects.slice(0, this.paginationObj.rowsPerPage),
			totalRows: this.arrOfRowObjects.length,
			pageNumber: 1,
    }
	},
	methods: {
		paginate(currentPage){
			// 
			this.pageNumber = currentPage
			console.log(this.pageNumber)
			let next = document.getElementById('next')
			let previous = document.getElementById('previous')
			if(this.pageNumber === this.totalPages){
				const start = (currentPage - 1) * this.paginationObj.rowsPerPage
				this.displayRows = this.arrOfRowObjects.slice(start, start+this.paginationObj.rowsPerPage)
				next.classList.add('disabled')
				previous.classList.remove('disabled')
			}else if(this.pageNumber === 1){
				const start = (currentPage - 1) * this.paginationObj.rowsPerPage
				this.displayRows = this.arrOfRowObjects.slice(start, start+this.paginationObj.rowsPerPage)
				previous.classList.add('disabled')
				next.classList.remove('disabled')
			}else if(this.pageNumber > 1 && this.pageNumber < this.totalPages){
				const start = (currentPage - 1) * this.paginationObj.rowsPerPage
				this.displayRows = this.arrOfRowObjects.slice(start, start+this.paginationObj.rowsPerPage)
				previous.classList.remove('disabled')
				next.classList.remove('disabled')
			}
			
			
		}

	},
	computed: {
		resultQuery(){
      if(this.searchQuery){
      return this.displayRows.filter((obj)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => obj.name.toLowerCase().includes(v))
      })
      }else{
        return this.displayRows
      }
		},
		totalPages(){
			return Math.ceil(this.totalRows/this.paginationObj.rowsPerPage)
		}

	}
}
</script>

<style>

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.disabled {
    pointer-events:none;
    opacity:0.6;         
}



</style>