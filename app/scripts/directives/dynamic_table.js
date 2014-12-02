'use strict';

angular.module('adminPanelApp')
	.directive('dynamicTable', function($timeout) {
		return {
			restrict: 'E',
			templateUrl: 'views/templates/dynamic_table.html',
			scope: {
				'config': '='
			},
			replace: true,
			link: function(scope, element){
        var sDom = angular.isDefined(scope.config.sDom) ? scope.config.sDom : '<\'row-fluid\'<\'span6\'l<\'pagination\'p>>\r>t<\'row-fluid pagination\'<\'span6\'i>>';
				// Timeout required to allow the scope to update the html structure
				$timeout(function(){
					// Enable the datatable plugin on your directive.
					element.dataTable({
						// number of rows to display per page
						'iDisplayLength': 30,
						// the option to control the number of items per page
						'aLengthMenu': [[30, 60, 100, -1], [30, 60, 100, 'All']],
						// controlling the generated table html
						'sDom': sDom,
						'fnDrawCallback': function(){
							// add paged class to table wrapper if we have more than one page
							element.parent().toggleClass('paged', this.fnPagingInfo().iTotalPages > 1);
						}
					});

					// sync table with scope collection
					var dataWatch = scope.$watchCollection('config.data', function(value){
						element.fnClearTable();
						var rows = [];
						for(var i = 0, l = value.length; i < l; i++){
							var item = value[i], row = [], structure = scope.config.structure;
              for(var j = 0, k = structure.length; j < k; j++){
                var rowData = $.isFunction(structure[j].field) ? structure[j].field(item) : item[structure[j].field];
                rowData = angular.isUndefined(rowData) ? '' : rowData;
								row.push(rowData);
							}
							rows.push(row);
						}

						element.fnAddData(rows);
					});

					scope.$on('$destroy', dataWatch);
				});
			}
		};
	});
