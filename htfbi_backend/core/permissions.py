from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrAdmin(BasePermission):
    
    # Custom permission to only allow owners of an object or admins to edit it.
    
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD, or OPTIONS requests.
        if request.method in SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the object or admin.
        return obj.owner == request.user or request.user.is_staff


class AdminOnly(BasePermission):
    
    # Custom permission to only allow admin users to access the view.
    
    def has_permission(self, request, view):
        # Check if the user is authenticated and is a staff member (admin)
        return request.user and request.user.is_staff