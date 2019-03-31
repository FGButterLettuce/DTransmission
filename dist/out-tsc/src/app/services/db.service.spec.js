import { TestBed } from '@angular/core/testing';
import { DbService } from './db.service';
describe('DbService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(DbService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=db.service.spec.js.map