import Base from './Base';

class Office extends Base {
    constructor() {
      super(Office.prototype.constructor.name);
    }

    static async afterSave(request: Parse.Cloud.AfterSaveRequest) {
        const { object, user } = request;
        if (user && !object.has('defaultRole')) {
          const query = new Parse.Query('Zone');
          const roleACL = new Parse.ACL();
          roleACL.setPublicReadAccess(true);
          const role = new Parse.Role(`ROLE_${Organization.name.toUpperCase()}_${object.id}`, roleACL);
          await role.save();
          object.set('defaultRole', role);
          await object.save(null, { sessionToken: user.getSessionToken() });
        }
      }
}