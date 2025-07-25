// utils/roleBasedComponents.tsx
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import NotFound from '../pages/errors/NotFound';
import React from 'react';

// Define role-based component mappings
export const ROLE_COMPONENTS = {
    dashboard: {
        admin: () => import('../pages/dashboard/AdminDashboard'),
        officer: () => import('../pages/dashboard/OfficerDashboard'),
        teacher: () => import('../pages/dashboard/TeacherDashboard'),
        student: () => import('../pages/dashboard/StudentDashboard'),
    },
    institution: {
        admin: () => import('../pages/institution/AdminInstitutions'),
        officer: () => import('../pages/institution/OfficerInstitutions'),
    },
} as const;

// Type for available roles
export type UserRole = 'admin' | 'officer' | 'teacher' | 'student';

// Type for route names
export type RouteName = keyof typeof ROLE_COMPONENTS;

// Type for role components mapping
type RoleComponentsMap = typeof ROLE_COMPONENTS;

// Hook for role-based component rendering
export const useRoleBasedComponent = (routeName: RouteName) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const userRole = user?.role?.toLowerCase() as UserRole;

    // Check if the route exists for this role
    const roleComponents = ROLE_COMPONENTS[routeName] as RoleComponentsMap[RouteName];

    if (!roleComponents || !userRole || !(userRole in roleComponents)) {
        return { Component: NotFound, loading: false, hasAccess: false };
    }

    const [Component, setComponent] = React.useState<React.ComponentType | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const ComponentImporter = roleComponents[userRole as keyof typeof roleComponents];

        if (ComponentImporter) {
            ComponentImporter()
                .then((module: any) => {
                    const ImportedComponent =
                        module.default ??
                        Object.values(module).find(val => typeof val === 'function');

                    if (!ImportedComponent) {
                        setComponent(() => NotFound);
                    } else {
                        setComponent(() => ImportedComponent);
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setComponent(() => NotFound);
                    setLoading(false);
                });
        } else {
            setComponent(() => NotFound);
            setLoading(false);
        }
    }, [userRole, routeName, roleComponents]);

    return {
        Component: Component || (() => <div>Loading...</div>),
        loading,
        hasAccess: true
    };
};

// Role-based component renderer
export const RoleBasedComponent: React.FC<{ routeName: RouteName }> = ({
    routeName
}) => {
    const { Component, loading } = useRoleBasedComponent(routeName);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return <Component />;
};