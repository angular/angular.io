(function(global) {
  // extra local packages
  var packageNames = [
    '01-01',
    '02-07',
    '02-08',
    '03-01',
    '03-02',
    '03-03',
    '03-04',
    '03-05', '03-05/app/shared', '03-05/app/shared/spinner', '03-05/app/shared/toast',
    '03-06', '03-06/app/shared', '03-06/app/shared/spinner', '03-06/app/shared/toast',
    '04-10', '04-10/app/shared', '04-10/app/+heroes', '04-10/app/shared/spinner', '04-10/app/shared/toast',
      '04-10/app/shared/filter-text', '04-10/app/shared/modal', '04-10/app/shared/nav',
    '04-14',
    '05-02',
    '05-03',
    '05-04',
    '05-12',
    '05-13',
    '05-14',
    '05-15', '05-15/app/heroes/shared',
    '05-16',
    '05-17',
    '06-01',
    '06-03',
    '07-01',
    '07-03',
    '07-04', '07-04/app/heroes/shared',
    '09-01'
  ];

  var packages = {};
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    packages: packages
  }

  System.config(config);

})(this);
