from rest_framework.permissions import BasePermission

class IsOwnerOrAdmin(BasePermission):

    def has_object_permission(self, request, view, obj):
        # Check if the user is the owner of the comment or an admin
        return obj.user == request.user or request.user.is_staff